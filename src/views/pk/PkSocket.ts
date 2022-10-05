import { SnakePkStatusType } from "@/components/game-map/game-object/snake/type";
import { usePkStore } from "@/stores/pk/pk.store";
import { PkStatusType, type IPkAction, type IPkState } from "@/stores/pk/types";
import type { IUserAction, IUserState } from "@/stores/user/types";
import { useUserStore } from "@/stores/user/user.store";
import { ElMessage } from "element-plus";
import type { Store } from "pinia";

export class PkSocket {
  socket: WebSocket;
  pkStore: Store<string, IPkState, {}, IPkAction>;
  userStore: Store<string, IUserState, {}, IUserAction>;

  constructor() {
    this.pkStore = usePkStore();
    this.userStore = useUserStore();

    this.socket = new WebSocket(
      import.meta.env.VITE_APP_SOCKETURL + this.userStore.token + "/"
    );

    this.pkStore.socket = this;

    this.socket.onmessage = (msg) => {
      const data = JSON.parse(msg.data);

      const snakeList = this.pkStore.gameMapObject?.snakeList;

      switch (data.event) {
        case "start-matching": // 匹配成功
          this.pkStore.rivalName = data.opponent_username;
          this.pkStore.updateGame(data.game);

          // 根据id，确定玩家自身为A还是B
          if (this.userStore.id === data.game.a_id.toString())
            this.pkStore.selfIndex = "A";
          else this.pkStore.selfIndex = "B";

          ElMessage.success("匹配成功，即将开始游戏!");
          setTimeout(() => {
            this.pkStore.status = PkStatusType.PLAYING;
          }, 2000);
          break;

        case "move":
          this.pkStore.updateDirection("A", data.a_direction);
          this.pkStore.updateDirection("B", data.b_direction);

          if (snakeList) {
            const [snake0, snake1] = snakeList;
            snake0.direction = data.a_direction;
            snake1.direction = data.b_direction;
          }
          break;

        case "result":
          if (snakeList) {
            const [snake0, snake1] = snakeList;

            if (data.loser === "all" || data.loser === "A") {
              snake0.status = SnakePkStatusType.DIE;
            }
            if (data.loser === "all" || data.loser === "B") {
              snake1.status = SnakePkStatusType.DIE;
            }
          }
          this.pkStore.loser = data.loser;
          break;
      }
    };
  }

  send(obj: { event: string; [x: string]: string }) {
    this.socket.send(JSON.stringify(obj));
  }

  close() {
    this.socket.close();
  }

  // 匹配按钮点击
  matchBtnHandle() {
    this.socket.onopen = () => {
      if (this.pkStore.status === PkStatusType.MATCHING) {
        this.send({
          event: "stop-matching",
        });
        this.pkStore.status = PkStatusType.NONE;
        this.close(); // 停止匹配则关闭socket连接
      } else {
        this.send({
          event: "start-matching",
          bot_id: "-1", // 待删除
        });
        this.pkStore.status = PkStatusType.MATCHING;
      }
    };
  }
}

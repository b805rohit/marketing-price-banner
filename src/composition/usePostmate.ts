import Postmate from "postmate";
import { cloneDeep } from "lodash-es";
import useStore from "../store";
import { useTranspiler } from "./useTranspiler";

const handshake = new Postmate.Model({});
export const usePostmate = () => {
  const store = useStore();
  const { htmlPreview, js } = useTranspiler();

  const emitCode = () => {
    if (!handshake) return;
    handshake?.then(async (parent: any) => {
      console.info("Emitting code to parent", parent);
      parent?.emit("code", {
        html: htmlPreview.value,
        js: js.value,
        elementStore: cloneDeep({
          plans: store.plans.value,
          defaultStyles: store.defaultStyles.value,
        }),
      });
    });
  };

  return {
    handshake,
    emitCode,
  };
};

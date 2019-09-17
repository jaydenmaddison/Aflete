import produce from "immer";
import * as Const from "src/config/actionConstants";

const initialState = {
  productsInfo: [],
  productsData: {},
  productNotes: {}
};

export default function general(state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case Const.STORE_PRODUCTS:
        draft.productsInfo = action.data;
        break;
      case Const.STORE_SINGLE_PRODUCT:
        if (!draft.productsData) {
          draft.productsData = {};
        }
        draft.productsData[action.product_id] = action.data;
        break;

      case Const.STORE_PRODUCT_NOTE:
        if (!draft.productNotes) {
          draft.productNotes = {};
        }
        draft.productNotes[action.product_id] = {...action.data, updated: true};
        break;
      // case Const.STORE_TEMP_EXERCISE_NOTE:
      //   draft.tempNotes[action.session_exercise_id] = action.data;
      //   break;

      default:
        return state;
    }
  });
}

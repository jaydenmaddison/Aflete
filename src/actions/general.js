import * as Const from 'src/config/actionConstants';

export function storeProducts(data) {
  return {
    type: Const.STORE_PRODUCTS,
    data
  };
}

export function storeSingleProduct(product_id, data) {
  return {
    type: Const.STORE_SINGLE_PRODUCT,
    product_id,
    data
  };
}

export function storeExerciseWeights(session_exercise_id, data) {
  return {
    type: Const.STORE_EXERCISE_WEIGHTS,
    session_exercise_id,
    data
  };
}

export function storeProductNote(product_id, data) {
  return {
    type: Const.STORE_PRODUCT_NOTE,
    product_id,
    data
  };
}

export function storeExerciseNote(session_exercise_id, data) {
  return {
    type: Const.STORE_EXERCISE_NOTE,
    session_exercise_id,
    data
  };
}

export function storeTempExerciseNote(session_exercise_id, data) {
  return {
    type: Const.STORE_TEMP_EXERCISE_NOTE,
    session_exercise_id,
    data
  };
}

export function storeTempExerciseWeights(session_exercise_id, data) {
  return {
    type: Const.STORE_TEMP_EXERCISE_WEIGHTS,
    session_exercise_id,
    data
  };
}
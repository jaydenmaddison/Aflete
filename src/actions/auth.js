export function login(){
  const resource = '/login';

  return async (dispatch, getState) => {
    const {
      general: {
        loading
      }
    } = getState();

    if (loading) {
      console.log('Already loading something. Cannot proceed.');
      return;
    }

    dispatch({
      type: 'PERFORMING_AN_ACTION',
      loading: true // or better, let reducer take care of it
    });

    try {
      const result = await axios.post(resource);

      dispatch({
        type: 'PERFORMED_AN_ACTION',
        loading: false,
        ...result.data
      });
    } catch (error) {
      console.error(`Error fetching ${resource}`, error);
      dispatch({
        type: 'FAILED_AN_ACTION',
        loading: false
      });
    }
  };
}

export function logout(){
    
}


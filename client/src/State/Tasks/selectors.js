import QueryString from 'query-string';

export const getfilteredTodo = (state, ownProps) => {
  const { showDone, searchValue } = QueryString.parse(ownProps.history.location.search);
  const id = ownProps.categoryId;
  if (id) {
    return state
      .filter(task => task.categoryId.toString() === id)
      .filter(task => showDone === 'true' ? true : task.checked === false)
      .filter(task => searchValue
        ? task.content.toLowerCase().includes(searchValue.toLowerCase())
        : true);
  } else {
    return searchValue
      ? state
        .filter(task => showDone === 'true' ? true : task.checked === false)
        .filter(task => searchValue
          ? task.content.toLowerCase().includes(searchValue.toLowerCase())
          : true)
      : [];
  }
};

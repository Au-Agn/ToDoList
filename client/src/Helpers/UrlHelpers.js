import QS from 'query-string';

export const replaseInQuery = (query, obj) => QS.stringify({ ...QS.parse(query), ...obj });

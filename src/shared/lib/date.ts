/**
 * Date -> 2024년 01월 01일 00시 00분
 */
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
}
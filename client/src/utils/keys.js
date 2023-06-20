export const getKeys = (object, filter) =>{
  return Object.keys(object).filter(key=> filter.includes(key))
}
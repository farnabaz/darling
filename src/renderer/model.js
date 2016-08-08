var instanceID = 1;
function generateID() {
  var id = instanceID;
  instanceID += 1;
  return id;
}
/**
 * Model class
 * - models have window-wide unique identifier
 */
class Model {
  constructor() {
    this._ID = generateID()
  }

  /**
   * unique identifier
   * @return {Integer} id models unique identifier
   */
  getID() {
    return this._ID;
  }
}


export default Model

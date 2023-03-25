import BaseRepository from "./base-repository";
import Realm from "realm";

const DATABASE_PATH = "realm-files/todos.realm";

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    text: "string",
    isChecked: "bool",
    createdAt: "date",
  },
  primaryKey: "_id",
};

class RealmRepository extends BaseRepository {
  constructor(databasePath = DATABASE_PATH) {
    super()
    this.databasePath = databasePath;
  }

  async init() {
    this.realm = await Realm.open({
      path: this.databasePath,
      schema: [TaskSchema],
    });
    this.id = this.getLastElementId();
    console.log(`Database Path: ${this.databasePath}, Current id = ${this.id}`);
  }

  create(text, isChecked) {
    let createdTaskId = -1;
    this.realm.write(() => {
      this.realm.create("Task", {
        _id: this.id,
        text: text,
        isChecked: isChecked,
        createdAt: new Date(),
      });
      createdTaskId = this.id;
      this.id += 1;
    });
    return createdTaskId;
  }

  readAll() {
    return this.realm.objects("Task").toJSON();
  }

  readSingle(id) {
    const result = this.realm.objects("Task").filtered(`_id = ${id}`);
    if (!result.isEmpty) {
      return result[0].toJSON();
    }
    return {};
  }

  update(id, isChecked) {
    this.realm.write(() => {
      this.realm.objects("Task").filtered(`_id = ${id}`).update("isChecked", isChecked);
    });
  }

  delete(id) {
    this.realm.write(() => {
      const obj = this.realm.objects("Task").filtered(`_id = ${id}`);
      this.realm.delete(obj);
    });

  }

  getLastElementId() {
    const objects = this.readAll();
    const length = objects.length;
    if (length > 0) {
      return objects[length - 1]._id + 1;
    }
    return 0;
  }
}

export { RealmRepository, DATABASE_PATH };

class BaseRepository {
  async init() { }

  create(text, isChecked) { }

  readAll() { }

  readSingle(id) { }

  update(id, isChecked) { }

  delete(id) { }
}

export default BaseRepository;
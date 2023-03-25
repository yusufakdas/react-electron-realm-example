class BaseRepository {
  async init(databaseAddress) { }

  async create(dataObject) { }

  async read(id = undefined) { }

  async update(id) { }

  async delete(id) { }
}

export default BaseRepository;
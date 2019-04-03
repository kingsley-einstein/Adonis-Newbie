'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.string('title', 80).notNullable()
      table.string('content', 10000).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema

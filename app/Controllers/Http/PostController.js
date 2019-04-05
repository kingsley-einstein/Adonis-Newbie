'use strict';

const Post = use('App/Models/Post');

class PostController {
  /**
   * @param {object} ctx
   * @param {Response} ctx.response
   * @param {Request} ctx.request
   */
  async post({response, auth, request}) {
    const post = await Post.create(request.body);

    return response.json(post);
  }

  /**
   * 
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async get({response, params: {id}}) {
    const post = await Post.query().where("id", id).fetch();

    return response.json(post);
  }
}

module.exports = PostController;
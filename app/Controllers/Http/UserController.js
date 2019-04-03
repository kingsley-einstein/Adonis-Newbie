'use strict'

const User = use('App/Models/User');

class UserController {
    /**
     * 
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async create({request, auth, response }) {
        //const { username } = request.post();
        //console.log(username);
        //console.log(request.body);
        const user = await User.create(request.body);
        const token = await auth.generate(user);

        return response.json({
            user: user,
            token: token
        });
    }

    /**
     * 
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async getAll({request, auth, response}) {
        const users = await User.all();

        return response.json(users);
    }

    /**
     * 
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async getOne({request, auth, response}) {
        const user = await User.query().where("id", request.params.id).with("posts").firstOrFail();

        return response.json(user);
    }

    /**
     * 
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async delete({request, auth, response}) {
        const user = await User.query().where("id", request.params.id).firstOrFail()

        await user.delete();

        return true;
    }
}

module.exports = UserController

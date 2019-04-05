'use strict'

const User = use('App/Models/User');
const Hash = use('Hash');

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
        const token = await auth.withRefreshToken().generate(user);

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
    async getOne({request, params: { id }, auth, response}) {
        const user = await User.query().where("id", id).with("posts").fetch();

        return response.json(user);
    }

    /**
     * 
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async delete({request, params: { id }, auth, response}) {
        const user = await User.query().where("id", id);

        await user.delete();

        return true;
    }

    async login({request, auth, response}) {
        const email = request.input('email');
        const password = request.input('password');

        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email);
                let accessToken = await auth.generate(user); 
                return response.status(200).json({
                    user: user,
                    token: accessToken
                })
            }
        } catch(e) {
            return response.status(500).json({
                message: 'Error occured',
                error: e
            })
        }
    }

    async findUserByToken({request, auth, response}) {
        try {
            const user = await auth.getUser();
            const mainUser = await User.query().where("id", user.id).with("posts").fetch();
            return response.status(200).json(mainUser);
        } catch(e) {
            return response.status(401).json({
                message: 'Unauthorized access'
            })
        }
    }
}

module.exports = UserController

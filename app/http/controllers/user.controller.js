class UserController {
    async getProfile(req, res, next) {
        try {
            const user = req.user;
             res.status(200).json({status: 200, user})
        } catch (err) {
            next(err)
        }
    }

    editProfile() {
    }

    addSkills() {
    }

    editSkills() {
    }

    acceptInviteTeam() {
    }

    rejectInviteInTeam() {
    }

}

module.exports = {
    UserController: new UserController()
}
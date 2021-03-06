module.exports = (sequelize, DataTypes) => {
    const UserAnswers = sequelize.define("UserAnswers", {
        user_ans_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        question_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            foreignKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            //foreignKey: true,
        },
        quiz_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            foreignKey: true,
        },
        answer_idx: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
    })

    UserAnswers.associate = (models) => {
        UserAnswers.belongsTo(models.Users, {
            foreignKey: 'question_id'
        });
        UserAnswers.belongsTo(models.Questions, {
            foreignKey: 'question_id'
        });
    }
    return UserAnswers;
}

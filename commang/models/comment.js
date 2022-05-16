const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        post: {
          type: Sequelize.STRING(140),
          allowNull: false,
        },
        author: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        parentComment:{
            type: Sequelize.STRING(200)
        },
        text: {
            type: Sequelize.STRING(200)
        },
        isDeleted:{
            type: Boolean
        },
        createdAt:{
            type:Date, default:Date.now
        },
        updatedAt:{
            type:Date
        },
      }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Comment',
        tableName: 'comments',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    }
  
    static associate(db) {
      db.Post.belongsTo(db.User);
      db.Post.belongsToMany(db.Post, { through: 'PostHashtag' });
    }
  };
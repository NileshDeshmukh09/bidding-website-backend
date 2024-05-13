// models/User.js
module.exports = (sequelize, Sequelize) => {
    const Proposals = sequelize.define(
      "Proposals",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        jobId : {
            type: Sequelize.STRING,
            allowNull: false,
          },
        description: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        deadline: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        charges : {
          type: Sequelize.STRING, 
          allowNull: false, 
        },
        coverLetter: {
          type : Sequelize.STRING,
          allowNull: true,
        },
      },
      {
        timestamps: true,
      }
    );
  
    return Proposals;
  };
  
  
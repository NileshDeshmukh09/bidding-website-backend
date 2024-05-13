const { db } = require("../models");
const User = db.User;
const Proposal = db.Proposals;
const Freelancer = db.Freelancer;
const Job = db.Job ;
const {
  validateProjectScope,
  validateExperience,
  validateBudget,
} = require("../utils/validations");

const createProposal = async (req, res) => {
  try {
    const {
      description,
      jobId,
      deadline,
      charges,
      coverLetter,
    } = req.body;

    // Check if title is provided
    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required" });
    }

    if (!jobId) {
        return res
          .status(400)
          .json({ success: false, message: "Job ID is required" });
      }

    // Check if projectScope is provided
    if (!charges) {
      return res
        .status(400)
        .json({ success: false, message: "Charges is required" });
    }

    // Check if timeRequired is provided
    if (!coverLetter) {
      return res
        .status(400)
        .json({ success: false, message: "Time required is required" });
    }

    const userId = req.id;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const freelancer = await Freelancer.findOne({ where: { userId } });

    const job = Job.findOne({where : {id : jobId}})

    if( !job ){
        return res.status(404).json({
            success : false,
            message : 'Oops! , Jobs for this JobID is not present!'
        })
    }
    // Create the Proposal
    const newProposal = await Proposal.create({
      freelancerId: freelancer.id,
      jobId,
      description,
      deadline,
      timeRequired,
      charges,
      coverLetter,
    });

    // Respond with success message and the created Proposal
    res.status(201).json({
      success: true,
      message: "Proposal Created Successfully!",
      Proposal: newProposal,
    });
  } catch (error) {
    console.error("Error creating Proposal:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all Proposals
const getAllProposals = async (req, res) => {
  try {
    const Proposals = await Proposal.findAll();
    res
      .status(200)
      .json({
        success: true,
        message: "Proposals fetched successfully",
        TotalProposals: Proposals.length,
        Proposals,
      });
  } catch (error) {
    console.error("Error fetching Proposals:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get a Proposal by ID
const getProposalById = async (req, res) => {
  const { id } = req.params;

  try {
    const Proposal = await Proposal.findByPk(id);

    if (!Proposal) {
      return res.status(404).json({ success: false, message: "Proposal not found" });
    }

    res.status(200).json({ success: true, Proposal });
  } catch (error) {
    console.error("Error fetching Proposal by ID:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get a Proposal by ID
const getProposalByClientID = async (req, res) => {
  const { clientId } = req.params;

  try {
    const client = await Client.findOne({ where: { id: clientId } });
    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }
    const Proposals = await Proposal.findAll({ where: clientId });

    if (!Proposals) {
      return res
        .status(404)
        .json({ success: false, message: "Proposals not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Proposal fetched successfully!",
        TotalProposals: Proposals.length,
        Proposals,
      });
  } catch (error) {
    console.error("Error fetching Proposal by ID:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

module.exports = {
  createProposal,
  getAllProposals,
  getProposalById,
  getProposalByClientID,
};

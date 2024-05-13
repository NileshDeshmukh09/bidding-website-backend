const { db } = require("../models");
const User = db.User;
const Proposal = db.Proposals;
const Freelancer = db.Freelancer;
const Job = db.Job;

const createProposal = async (req, res) => {
  try {
    const { description, jobId, deadline, charges, coverLetter } = req.body;

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

    const userId = req.id;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const freelancer = await Freelancer.findOne({ where: { userId } });

    if (!freelancer) {
      return res.status(404).json({
        success: false,
        message: "Freelancer is not present for this userID !!",
      });
    }
    const job = Job.findOne({ where: { id: jobId } });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Oops! , Jobs for this JobID is not present!",
      });
    }
    // Create the Proposal
    const newProposal = await Proposal.create({
      freelancerId: freelancer.id,
      jobId,
      description,
      deadline,
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

// Get a Proposal by ID
const getProposalById = async (req, res) => {
  const { id } = req.params;

  try {
    const proposal = await Proposal.findByPk(id);

    if (!proposal) {
      return res
        .status(404)
        .json({ success: false, message: "Proposal not found" });
    }

    res.status(200).json({ success: true, proposal });
  } catch (error) {
    console.error("Error fetching Proposal by ID:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get a Proposal by ID
const getProposalByFreelancerID = async (req, res) => {
  const { freelancerId } = req.params;

  try {
    const freelancer = await Freelancer.findOne({
      where: { id: freelancerId },
    });
    if (!freelancer) {
      return res
        .status(404)
        .json({ success: false, message: "Freelancer not found" });
    }
    const Proposals = await Proposal.findAll({ where: {freelancerId} });

    res.status(200).json({
      success: true,
      message: "Proposal fetched successfully!",
      TotalProposals: Proposals.length,
      Proposals,
    });
  } catch (error) {
    console.error("Error fetching Proposal by ID:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createProposal,
  getProposalById,
  getProposalByFreelancerID,
};

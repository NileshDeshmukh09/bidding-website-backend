const { db } = require("../models");
const User = db.User;
const Job = db.Job;
const Client = db.Client;
const {
  validateProjectScope,
  validateExperience,
  validateBudget,
} = require("../utils/validations");

const createJob = async (req, res) => {
  try {
    // Extract job details from request body
    const {
      title,
      skills,
      projectScope,
      timeRequired,
      experience,
      contractType,
      budget,
      description,
    } = req.body;

    // Check if title is provided
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    // Check if skills are provided
    if (!skills) {
      return res
        .status(400)
        .json({ success: false, message: "Skills are required" });
    }

    // Check if projectScope is provided
    if (!projectScope) {
      return res
        .status(400)
        .json({ success: false, message: "Project scope is required" });
    }

    // Check if timeRequired is provided
    if (!timeRequired) {
      return res
        .status(400)
        .json({ success: false, message: "Time required is required" });
    }

    // Check if experience is provided
    if (!experience) {
      return res
        .status(400)
        .json({ success: false, message: "Experience is required" });
    }

    // Check if contractType is provided
    if (!contractType) {
      return res
        .status(400)
        .json({ success: false, message: "Contract type is required" });
    }

    // Check if budget is provided
    if (!budget) {
      return res
        .status(400)
        .json({ success: false, message: "Budget is required" });
    }

    // Check if description is provided
    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required" });
    }

    const userId = req.id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const client = await Client.findOne({ where: { userId } });

    // Validate projectScope, experience, and budget
    validateProjectScope(projectScope);
    validateExperience(experience);
    validateBudget(budget);

    // Create the job
    const newJob = await Job.create({
      clientId: client.id,
      title,
      skills,
      projectScope,
      timeRequired,
      experience,
      contractType,
      budget,
      description,
    });

    // Respond with success message and the created job
    res.status(201).json({
      success: true,
      message: "Job posted successfully!",
      job: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res
      .status(200)
      .json({
        success: true,
        message: "Jobs fetched successfully",
        TotalJobs: jobs.length,
        jobs,
      });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get a job by ID
const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findByPk(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Error fetching job by ID:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
  }
};

// Get a job by Client ID
const getJobByClientID = async (req, res) => {
  const { clientId } = req.params;

  try {
    const client = await Client.findOne({ where: { id: clientId } });
    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }
    const jobs = await Job.findAll({ where:{ clientId }});

    res
      .status(200)
      .json({
        success: true,
        message: "Job fetched successfully!",
        TotalJobs: jobs.length,
        jobs,
      });
  } catch (error) {
    console.error("Error fetching job by ID:", error.message);
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
  createJob,
  getAllJobs,
  getJobById,
  getJobByClientID,
};

import { Project } from '../models/Project.modals.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getProjects = asyncHandler(async (req, res) => {
    try {
        console.log("User ID: ", req.user.id);

        const projects = await Project.find({ userId: req.user.id });

        if (!projects || projects.length === 0) {
            throw new ApiError(404, "No projects found for the user.");
        }

        res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully"));
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw new ApiError(500, "Error fetching projects");
    }
});

const createProject = asyncHandler(async (req, res) => {
    try {
        const count = await Project.countDocuments({ userId: req.user.id });
        if (count >= 4) {
            throw new ApiError(400, "Projects limit reached");
        }

        const project = await Project.create({
            title: req.body.title,
            userId: req.user.id,
        });

        res.status(200).json(new ApiResponse(200, project, "Project created successfully"));
    } catch (error) {
        console.error("Error creating project:", error);
        throw new ApiError(500, "Error while creating project");
    }
});

const deleteProject = asyncHandler(async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        if (!project) {
            throw new ApiError(404, "Project not found or you're not authorized to delete this project.");
        }

        res.status(200).json(new ApiResponse(200, null, "Project deleted successfully"));
    } catch (error) {
        console.error("Error deleting project:", error);
        throw new ApiError(500, "Error while deleting project");
    }
});

export { getProjects, createProject, deleteProject };

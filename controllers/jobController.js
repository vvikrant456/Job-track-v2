import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';

import { NotFoundError } from '../errors/customErrors.js';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  //   const { company, position } = req.body;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  // console.log(job);
  if (!job) {
    throw new NotFoundError(`no job with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Found job', job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    throw new NotFoundError(`no job with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Job modified', updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  if (!removedJob) {
    throw new NotFoundError(`no job with id ${id}`);
  }

  res.status(StatusCodes.OK).json({ msg: 'Job deleted', job: removedJob });
};

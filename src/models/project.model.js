const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const projectSchema = new Schema(
  {
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    freelancer_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    company_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    project_name: {
      type: String,
      required: true,
    },
    description: String,
    state: String,
    total_session_hours: Number,
    remaining_hours: Number,
    start_date: Date,
    end_date: Date,
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

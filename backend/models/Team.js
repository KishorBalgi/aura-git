// Imports
const mongoose = require("mongoose");
const errors = require("../configs/error.codes.json");

// Constants
const TeamSchema = new mongoose.Schema({
    // Event Partaking
    event_participated: {
        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: [true, errors[400].participationEventIdRequired],
        },
        event_title: {
            type: String,
            ref: "Event.title",
            required: [true, errors[400].participationEventNameRequired],
        },
    },
    team_name: {
        type: String,
        required: [true, errors[400].teamNameRequired],
    },
    team_leader: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: [true, errors[400].teamLeaderIdRequired],
        },
        usn: {
            type: String,
            required: [true, errors[400].teamLeaderUsnRequired],
        },
        name: {
            type: String,
            required: [true, errors[400].teamLeaderNameRequired],
        },
        email: {
            type: String,
            required: [true, errors[400].teamLeaderEmailRequired],
        },
    },
    team_members: {
        type: [{
            id: {
                type: mongoose.Types.ObjectId,
                ref: "user",
                required: [true, errors[400].teamMemberIdRequired],
            },
            email: {
                type: String,
                required: [true, errors[400].teamMemberEmailRequired],
            },
            usn: {
                type: String,
                required: [true, errors[400].teamMemberUsnRequired],
            },
            name: {
                type: String,
                required: [true, errors[400].teamMemberNameRequired],
            },
        }],
        default: {},
    },
}, { timestamps: true });

const Team = mongoose.model("team", TeamSchema);

module.exports = Team;
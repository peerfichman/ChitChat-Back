const db = require("../DB");

const createAgent = async (agent_name, sentiment, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply) => {
    const {rows} = await db.query(
        "INSERT INTO agents (agent_name, sentiment, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply ) VALUES ($1, $2, $3, $4, $5, ARRAY $6, $7) RETURNING *",
        [agent_name,sentiment, opinion_alignment, talking_style, activity_level, topics_of_interest, messages_to_reply]
    );

    return rows[0];
}

const jointAgentToExperiment = async (exp_id, agent_id) =>{
    const {rows} = await db.query(
        "INSERT INTO experiment_agent (exp_id, agent_id) VALUES ($1, $2) RETURNING *",
        [exp_id, agent_id]
    );
    return rows[0];
}

const getAgentById = async (agent_id) => {
    const {rows} = await db.query(
        "SELECT * FROM agents WHERE agent_id = $1",
        [agent_id]
    );
    return rows[0];
}

const getExperimentWithAgentsAsJson  = async (exp_id) =>{
    const {rows} = await db.query(
    `SELECT json_build_object(
         'exp', json_build_object(
             'exp_id', e.exp_id,
             'exp_subject', e.exp_subject,
            'exp_provoking_prompt',  e.exp_provoking_prompt,
            'exp_crated_at', e.exp_created_at,\t
            'exp_status', e.exp_status,
            'exp_name',e.exp_name,
            'exp_messages_col_id', e.exp_messages_col_id
            ),
        'agents', json_agg( json_build_object(
            'agent_id', a.agent_id,
            'agent_name', a.agent_name,
            'opinion_alignment', a.opinion_alignment,
            'talking_style', a.talking_style,
            'activity_level', a.activity_level,
            'topics_of_interest',a.topics_of_interest,
            'messages_to_reply', a.messages_to_reply
            ))) as exp_agent 
            FROM experiment_agent  
            INNER JOIN experiments e ON experiment_agent.exp_id = e.exp_id 
            INNER JOIN agents a ON experiment_agent.agent_id = a.agent_id
            GROUP BY e.exp_id, experiment_agent.exp_id
            HAVING experiment_agent.exp_id = $1;`,
        [exp_id]
    )
    const {exp_agents} = rows[0]
    return exp_agents;
}

module.exports = {
    createAgent,
    jointAgentToExperiment,
    getAgentById,
    getExperimentWithAgentsAsJson
}
import React from 'react'
const Attempts = (props) => (
    <div>
        <small>
            Attempts
      </small>
        <div style={{ marginBottom: 25 }} className="input-group">
            <input id="attempts" type="number" className="form-control" name="attempts" onChange={props.onChange} value={props.attempts} />
        </div>
    </div>
)
export default Attempts

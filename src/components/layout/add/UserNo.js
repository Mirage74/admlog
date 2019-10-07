import React from 'react'
function UserNo(props) {
    const { min, max, users } = props
    let str = `UserNo between ${min} and ${max}`
    let nmUser = []
    let isExist
    for (let i = min; i <= max; i++) {
        isExist = false
        for (let j = 0; j < users.length; j++) {
            if (users[j].userNo === i) {
                isExist = true
            }
        }
        if (!isExist) {
            nmUser.push(i)
        }
    }
    return (
        <div>
            <small >{str}</small>
            <div style={{ marginBottom: 25 }} className="input-group">
                <select className="form-control" id="UserNo" onChange={props.onChange} name="userNo" value={props.userNo}>
                    {nmUser.map(cnt => (
                        <option key={cnt}>
                            {cnt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
export default UserNo



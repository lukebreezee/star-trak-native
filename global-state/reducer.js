const ACTIONS = {
    USER_LOGIN: 'USER LOGIN',
    TEAM_INFO_UPDATE: 'TEAM INFO UPDATE',
    USER_LOGOUT: 'USER LOGOUT',
    TEAM_LOGIN: 'TEAM LOGIN',
    TEAM_LOGOUT: 'TEAM LOGOUT',
    STACK_DECIDER_REFRESH: 'STACK DECIDER REFRESH'
}

const reducer = (state = initialState, action) => {
    const tmp = {...state};

    switch(action.type) {
        case ACTIONS.USER_LOGIN:
            tmp.userInfo = action.userInfo;
            break;

        case ACTIONS.TEAM_INFO_UPDATE:
            tmp.teamInfo = action.teamInfo;
            break;

        case ACTIONS.USER_LOGOUT:
            tmp.userInfo = null;
            tmp.teamInfo = null;
            break;

        case ACTIONS.TEAM_LOGIN:
            tmp.userInfo.teamUsername = action.teamUsername;
            break;

        case ACTIONS.TEAM_LOGOUT:
            tmp.teamInfo = null;
            break;

        case ACTIONS.STACK_DECIDER_REFRESH:
            tmp.stackDeciderRefreshSwitch = !tmp.stackDeciderRefreshSwitch;
            break;

        default:
            return state;
    }

    return tmp;
}

export { ACTIONS, reducer };
import { ACTIVITY_MODLUE } from "./_prefix";

export function create_activity(activityInfo){
    return fetch(`${ACTIVITY_MODLUE}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityInfo),
      }).then(res => res.json());
}
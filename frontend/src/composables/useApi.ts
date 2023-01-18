import { Configuration, SecurityApi, UserApi } from "@/api/internal/v1"
import { useAuthStore } from "@/stores/auth"
import { storeToRefs } from "pinia"
import { useSSRContext } from "vue"

export const useApi = () => {
    const { userToken } = storeToRefs(useAuthStore());
    function users(accessToken?: string) {
        if (!!accessToken) {
            console.log('user api with custom token ', accessToken)
            return new UserApi(new Configuration({accessToken: accessToken}))
        }
        return new UserApi(new Configuration({accessToken: userToken.value||''}));
    }

    function security() {
        return new SecurityApi(new Configuration({accessToken: userToken.value || ''}));
    }
    return { users, security }
}

import { Redirect } from 'expo-router'
import { APP_ROUTES } from '@constant/routes'

export default function Index() {
	return <Redirect href={`/${APP_ROUTES.imoveis}`} />
}

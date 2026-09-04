import { Redirect } from 'expo-router'
import { APP_ROUTES } from '@constant/routes'
import { useAuth } from '@shared/context/AuthContext'
import LoadingView from '@shared/pages/Loading/LoadingView'

export default function Index() {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) return <LoadingView />

	return <Redirect href={`/${isAuthenticated ? APP_ROUTES.imoveis : APP_ROUTES.auth.login}`} />
}

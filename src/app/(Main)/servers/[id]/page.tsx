import { ServerLayout } from "./server-layout";
interface ServerPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ServerPage({ params }: ServerPageProps) {
	const { id } = await params;
	return <ServerLayout serverId={Number.parseInt(id)} />;
}

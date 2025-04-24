import { ServerLayout } from "./server-layout";

interface ServerPageProps {
	params: {
		id: string;
	};
}

export default function ServerPage({ params }: ServerPageProps) {
	return <ServerLayout serverId={Number.parseInt(params.id)} />;
}

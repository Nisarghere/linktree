import { getLinksByHandle } from "@/app/lib/db";

export default async function Page({ params }) {
    const { handle } = await params;

    const links = await getLinksByHandle(handle);

    if (!links || links.length === 0) {
        return <div>No profile found for @{handle}</div>;
    }

    return (
        <div className="flex flex-col justify-center  items-center">
            <div className="flex flex-col items-center justify-center" style={{ marginTop: "20px" }}>
                {links.map((link) => (
                    <div key={link.id} style={{ marginBottom: "10px" }}>
                        <img src={link.pic} alt="Profile picture" />

                        <h1>@{handle}</h1>

                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.text}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
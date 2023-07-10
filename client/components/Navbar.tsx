import Logo from './Logo'

type Props = {}

export default function Navbar({}: Props) {
    return (
        <nav className="bg-white border-b-gray-400 shadow-md py-1">
            <div className="px-4 2xl:px-0 max-w-8xl mx-auto flex justify-between">
                <Logo />
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Carolina</span>
                    <button>
                        <img
                            src="https://images.unsplash.com/photo-1676380367878-c79a5f40edb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                            alt="avatar"
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                    </button>
                </div>
            </div>
        </nav>
    )
}

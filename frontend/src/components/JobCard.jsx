import { BsTelephone, BsEnvelope, BsGeoAlt, BsBriefcase } from 'react-icons/bs'

export const JobCard = ({ job }) => {
    return (
        <div className={`bg-white dark:bg-zinc-900 border rounded-2xl p-6 flex flex-col gap-4 hover:-translate-y-0.5 transition-all cursor-pointer relative overflow-hidden
            ${job.urgente
                ? 'border-orange-400 dark:border-orange-500'
                : 'border-zinc-200 dark:border-zinc-800 hover:border-sky-400'
            }`}
        >
            {job.urgente && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-400" />
            )}

            <div className="flex justify-between items-start gap-2">
                <h2 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-100 leading-tight">
                    {job.name}
                </h2>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${
                    job.urgente
                        ? 'bg-orange-50 dark:bg-orange-950 text-orange-500'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                }`}>
                    {job.urgente ? '🔴 Urgente' : 'Normal'}
                </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-sky-500 bg-sky-50 dark:bg-sky-950 px-2.5 py-1 rounded-md">
                    <BsBriefcase size={11} />
                    {job.jobType}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md">
                    <BsGeoAlt size={11} />
                    {job.localidad}
                </span>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-light line-clamp-3">
                {job.jobDescription}
            </p>

            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <BsTelephone size={13} className="shrink-0" />
                    <a href={`tel:${job.phone}`} className="hover:text-sky-400 transition-colors truncate">
                        {job.phone}
                    </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <BsEnvelope size={13} className="shrink-0" />
                    <a href={`mailto:${job.mail}`} className="hover:text-sky-400 transition-colors truncate">
                        {job.mail}
                    </a>
                </div>
            </div>
        </div>
    )
}
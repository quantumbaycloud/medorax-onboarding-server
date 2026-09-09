import React, { useState } from 'react';
import { ChevronRight, ClipboardList } from 'lucide-react';
import { pendingActionsData } from './data';

const PendingActions = () => {
    const [actions, setActions] = useState(pendingActionsData);

    const handleResolve = (id, status) => {
        setActions(prev =>
            prev.map(action =>
                action.id === id
                    ? { ...action, resolved: true, status }
                    : action
            )
        );
    };

    const pendingCount = actions.filter(a => !a.resolved).length;

    return (
        <div className="bg-[#ffffff] rounded-md shadow-sm flex flex-col overflow-hidden">
            <div className="px-4 py-2 flex items-center justify-between bg-[#ffffff]">
                <div className="flex items-center gap-1">
                    <ClipboardList size={20} className="text-[#235eac]" />
                    <h2 className="text-[20px] font-semibold text-[#171c24] leading-7">Pending Administrative Actions</h2>
                    <span className="bg-[#e5e8f4] text-[#424751] text-[11px] font-bold px-1.5 py-0.5 rounded-full ml-1 leading-4">
                        {pendingCount}
                    </span>
                </div>
                <a className="text-[12px] font-semibold text-[#235eac] hover:underline flex items-center leading-4 cursor-pointer" href="#">
                    View Complete Queue
                    <ChevronRight size={16} />
                </a>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#f1f3ff] text-[#424751] text-[12px] font-semibold tracking-wider leading-4">
                            <th className="py-1 px-4 font-semibold">REQUEST TYPE</th>
                            <th className="py-1 px-4 font-semibold">INITIATOR</th>
                            <th className="py-1 px-4 font-semibold">BRANCH / SCOPE</th>
                            <th className="py-1 px-4 font-semibold">PRIORITY</th>
                            <th className="py-1 px-4 font-semibold text-right">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-0 text-[#171c24] text-[14px] font-normal leading-6">
                        {actions.map((action) => (
                            <tr
                                key={action.id}
                                className={`hover:bg-[#f1f3ff]/60 transition-colors h-10 group ${action.resolved ? 'opacity-40' : ''}`}
                            >
                                <td className="px-4 py-1 font-medium text-[#171c24]">
                                    <div className="flex items-center gap-1.5">
                                        <action.icon size={16} className="text-[#235eac]" />
                                        <span className="truncate">{action.type}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-1 text-[#424751]">
                                    <span className="font-semibold text-[#171c24]">{action.initiator}</span>
                                    <span className="text-[12px] block text-[#737782] font-normal leading-none">{action.role}</span>
                                </td>
                                <td className="px-4 py-1 text-[#424751]">
                                    <span className="bg-[#e5e8f4] text-[#171c24] text-[11px] font-medium px-1.5 py-0.5 rounded leading-4">
                                        {action.branch}
                                    </span>
                                </td>
                                <td className="px-4 py-1">
                                    <span className={`${action.priorityColor} text-[11px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide leading-4`}>
                                        {action.priority}
                                    </span>
                                </td>
                                <td className="px-4 py-1 text-right">
                                    {action.resolved ? (
                                        <span className={`text-[12px] font-semibold leading-4 ${action.status === 'Approved' ? 'text-[#006d40]' : 'text-[#ba1a1a]'}`}>
                                            {action.status}
                                        </span>
                                    ) : (
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                className="h-7 px-2 text-[12px] font-semibold rounded bg-[#9cf6bc] text-[#0f7345] hover:bg-[#006d40] hover:text-[#ffffff] transition-colors leading-4"
                                                onClick={() => handleResolve(action.id, 'Approved')}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="h-7 px-2 text-[12px] font-semibold rounded bg-[#e5e8f4] text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors leading-4"
                                                onClick={() => handleResolve(action.id, 'Rejected')}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-4 py-1 bg-[#ffffff] flex items-center justify-between text-[#424751] text-[12px] font-medium leading-4">
                <span>Showing {pendingCount} pending approvals requiring Super Admin clearance</span>
                <span className="text-[#737782]">Updated real-time</span>
            </div>
        </div>
    );
};

export default PendingActions;
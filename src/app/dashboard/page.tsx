"use client";

import { useState } from "react";

type Invoice = {
    id: number;
    invoiceNumber: string;
    clientName: string;
    amount: number;
    status: "Paid" | "Pending" | "Overdue";
    dueDate: string;
};

// Dummy invoices
const invoices: Invoice[] = [
    { id: 1, invoiceNumber: "INV-1001", clientName: "John Doe", amount: 2500, status: "Paid", dueDate: "2025-09-25" },
    { id: 2, invoiceNumber: "INV-1002", clientName: "Jane Smith", amount: 1800, status: "Pending", dueDate: "2025-09-28" },
    { id: 3, invoiceNumber: "INV-1003", clientName: "Michael Lee", amount: 3200, status: "Overdue", dueDate: "2025-09-15" },
    { id: 4, invoiceNumber: "INV-1004", clientName: "Emily Davis", amount: 4000, status: "Paid", dueDate: "2025-09-18" },
    { id: 5, invoiceNumber: "INV-1005", clientName: "Chris Brown", amount: 2200, status: "Pending", dueDate: "2025-09-22" },
    { id: 6, invoiceNumber: "INV-1006", clientName: "Sarah Wilson", amount: 1500, status: "Overdue", dueDate: "2025-09-10" },
    { id: 7, invoiceNumber: "INV-1007", clientName: "David Johnson", amount: 2750, status: "Paid", dueDate: "2025-09-27" },
];

const ITEMS_PER_PAGE = 5;

export default function DashboardPage() {
    const [page, setPage] = useState(1);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedInvoices = invoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(invoices.length / ITEMS_PER_PAGE);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold mb-6">Invoices Dashboard</h1>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Invoice #</th>
                            <th className="p-3">Client</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedInvoices.map((inv) => (
                            <tr key={inv.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{inv.invoiceNumber}</td>
                                <td className="p-3">{inv.clientName}</td>
                                <td className="p-3">{formatCurrency(inv.amount)}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm font-medium ${inv.status === "Paid"
                                                ? "bg-green-100 text-green-600"
                                                : inv.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {inv.status}
                                    </span>
                                </td>
                                <td className="p-3">{inv.dueDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// Example invoice type
type LineItem = {
    id: number;
    description: string;
    quantity: number;
    unitPrice: number;
};

type Invoice = {
    id: number;
    invoiceNumber: string;
    clientName: string;
    status: "Paid" | "Pending" | "Overdue";
    dueDate: string;
    items: LineItem[];
};

const sampleInvoice: Invoice = {
    id: 1,
    invoiceNumber: "INV-1001",
    clientName: "John Doe",
    status: "Pending",
    dueDate: "2025-09-25",
    items: [
        { id: 1, description: "Website Design", quantity: 1, unitPrice: 2000 },
        { id: 2, description: "Hosting (12 months)", quantity: 1, unitPrice: 300 },
        { id: 3, description: "Maintenance", quantity: 12, unitPrice: 50 },
    ],
};

export default function InvoiceDetailsPage() {
    const router = useRouter();
    const [downloading, setDownloading] = useState(false);

    const totalAmount = sampleInvoice.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
    );

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

    const handleDownloadPDF = () => {
        setDownloading(true);
        setTimeout(() => {
            alert("PDF download simulated!");
            setDownloading(false);
        }, 1500);
    };

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <button
                onClick={() => router.push("/dashboard")}
                className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                ← Back to Dashboard
            </button>

            <div className="bg-white shadow-lg rounded-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-start border-b pb-4 mb-4">
                    <div>
                        <h1 className="text-xl font-semibold">Invoice {sampleInvoice.invoiceNumber}</h1>
                        <p className="text-gray-600">Client: {sampleInvoice.clientName}</p>
                        <p className="text-gray-600">Due Date: {sampleInvoice.dueDate}</p>
                    </div>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${sampleInvoice.status === "Paid"
                                ? "bg-green-100 text-green-600"
                                : sampleInvoice.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-red-100 text-red-600"
                            }`}
                    >
                        {sampleInvoice.status}
                    </span>
                </div>

                {/* Line Items */}
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Description</th>
                            <th className="p-3">Qty</th>
                            <th className="p-3">Unit Price</th>
                            <th className="p-3">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleInvoice.items.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{item.description}</td>
                                <td className="p-3">{item.quantity}</td>
                                <td className="p-3">{formatCurrency(item.unitPrice)}</td>
                                <td className="p-3">{formatCurrency(item.quantity * item.unitPrice)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Footer Total */}
                <div className="flex justify-end mt-4">
                    <div className="text-right">
                        <p className="text-lg font-semibold">
                            Total: {formatCurrency(totalAmount)}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleDownloadPDF}
                        disabled={downloading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {downloading ? "Preparing PDF..." : "Download PDF"}
                    </button>
                </div>
            </div>
        </div>
    );
}

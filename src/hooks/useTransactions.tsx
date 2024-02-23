import { useMutation, useQuery } from "react-query";
import { Transaction } from "../types";

const fetchTransactions = async () => {
    const response = await fetch("/api/transactions");
    const data = await response.json();
    return data.transactions as Transaction[];
};

const fetchTransactionsByUser = async (userId: string) => {
    const response = await fetch(`/api/transactions/user/${userId}`);
    const data = await response.json();
    return data.transactions as Transaction[];
}

const fetchTransactionById = async (id: string) => {
    const response = await fetch(`/api/transactions/${id}`);
    const data = await response.json();
    return data as Transaction;
}

const fetchTransactionsForMultipleUsers = async (userIds: string[]) => {
    const response = await fetch(`/api/transactions/users/${JSON.stringify(userIds)}`);
    const data = await response.json();
    return data.transactions as Transaction[];
}

interface UpdateBatchTransactionsData {
    message: string;
    transactions: Transaction[];
}

interface UpdateBatchTransactionsResponse {
    index: number;
    data: UpdateBatchTransactionsData;
}

const updateBatchTransactions = async ({ transactions, index }: { transactions: Transaction[], index: number }) => {
    const response = await fetch("/api/transactions/update-batch", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactions }),
    });
    const data = await response.json();
    return {
        index,
        data,
    } as UpdateBatchTransactionsResponse
}

function useTransactions() {
    return useQuery<Transaction[], Error>("transactions", fetchTransactions);
}

function useTransactionsByUser(userId: string) {
    return useQuery<Transaction[], Error>(["transactions", userId], () => fetchTransactionsByUser(userId));
}

function useTransactionById(id: string) {
    return useQuery<Transaction, Error>(["transaction", id], () => fetchTransactionById(id));
}

function useTransactionsForMultipleUsers(userIds: string[]) {
    return useQuery<Transaction[], Error>(["transactions", userIds], () => fetchTransactionsForMultipleUsers(userIds));
}



export {
    fetchTransactions,
    fetchTransactionsForMultipleUsers,
    updateBatchTransactions,
    useTransactions,
    useTransactionsByUser,
    useTransactionById,
    useTransactionsForMultipleUsers,
}

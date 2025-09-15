
import { useForm } from "react-hook-form";
import { FaPlus, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const StudyPlanner = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  // ✅ Get all study plans (TanStack Query)
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["studyPlans"],
    queryFn: async () => {
      const res = await axiosSecure.get("/study-plans");
      return res.data;
    },
  });

  // ✅ Add new plan
  const addPlanMutation = useMutation({
    mutationFn: async (newPlan) => {
      const res = await axiosSecure.post("/study-plans", newPlan);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["studyPlans"]);
      reset();
      Swal.fire("Success", "Study plan added!", "success");
    },
  });

  // ✅ Delete plan
  const deletePlanMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/study-plans/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["studyPlans"]);
      Swal.fire("Deleted!", "Study plan removed.", "success");
    },
  });

  const handleAddPlan = (data) => {
    addPlanMutation.mutate({
      subject: data.subject,
      topic: data.topic,
      priority: data.priority,
      deadline: data.deadline,
      status: "pending",
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePlanMutation.mutate(id);
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6 text-sky-300">📅 Study Planner</h2>

      {/* Add Plan Form */}
      <form
        onSubmit={handleSubmit(handleAddPlan)}
        className="bg-base-200 p-4 rounded-2xl grid gap-4 md:grid-cols-2 shadow"
      >
        <input
          {...register("subject", { required: true })}
          placeholder="Subject"
          className="input input-bordered w-full"
        />
        <input
          {...register("topic", { required: true })}
          placeholder="Topic / Task"
          className="input input-bordered w-full"
        />
        <select
          {...register("priority", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="High">🔥 High Priority</option>
          <option value="Medium">⚡ Medium Priority</option>
          <option value="Low">✅ Low Priority</option>
        </select>
        <input
          type="date"
          {...register("deadline", { required: true })}
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary col-span-full">
          <FaPlus /> Add Plan
        </button>
      </form>

      {/* Plans Table */}
      {isLoading ? (
        <p className="text-center mt-6">Loading plans...</p>
      ) : plans.length === 0 ? (
        <p className="text-center mt-6 text-gray-500">
          No study plans yet. Add one above!
        </p>
      ) : (
        <div className="overflow-x-auto mt-6">
          <table className="table w-full ">
            <thead className="text-gray-500">
              <tr>
                <th>Subject</th>
                <th>Topic</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan._id}>
                  <td>{plan.subject}</td>
                  <td>{plan.topic}</td>
                  <td>
                    <span
                      className={`badge ${
                        plan.priority === "High"
                          ? "badge-error"
                          : plan.priority === "Medium"
                          ? "badge-warning"
                          : "badge-success"
                      }`}
                    >
                      {plan.priority}
                    </span>
                  </td>
                  <td>{new Date(plan.deadline).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        plan.status === "completed"
                          ? "badge-success"
                          : "badge-outline"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="btn btn-xs btn-error"
                    >
                      <FaTrash />
                    </button>
                    {/* Later add Edit & Complete buttons */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;

import axios from "axios";

export const fetchServices = async () => {
  const { data } = await axios.get("Services/GetAllServices");
  return data;
};

export const createNewService = async (serviceData) => {
  const formData = new FormData();
  formData.append("S_ServiceName", serviceData.S_ServiceName);
  formData.append("S_Description", serviceData.S_Description);
  formData.append("S_BaseCharge", serviceData.S_BaseCharge);

  const { data } = await axios.post("Services/AddServiceDetails", formData);
  return data;
};

export const updateExistingService = async (serviceData) => {
  const formData = new FormData();
  formData.append("S_ServiceID", serviceData.S_ServiceID);
  formData.append("S_ServiceName", serviceData.S_ServiceName);
  formData.append("S_Description", serviceData.S_Description);
  formData.append("S_BaseCharge", serviceData.S_BaseCharge);

  const { data } = await axios.put("Services/PutServiceDetails", formData);
  return data;
};

export const deleteExistingService = async (serviceId) => {
  const formData = new FormData();
  formData.append("S_ServiceID", serviceId);

  const { data } = await axios.delete("Services/DeleteServiceDetails", {
    data: formData,
  });
  return data;
};
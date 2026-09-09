// ReviewAccordion.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircle2,
  Building2,
  FileText,
  Landmark,
} from "lucide-react";
import ReviewAccordionItem from "./ReviewAccordionItem";
import AccountInformationContent from "./AccountInformationContent";
import BusinessDetailsContent from "./BusinessDetailsContent";
import UploadedDocumentsContent from "./UploadedDocumentsContent";
import BankSetupContent from "./BankSetupContent";

export default function ReviewAccordion({ reviewData, onDataUpdate }) {
  const navigate = useNavigate();
  const [openItem, setOpenItem] = useState("account");

  const toggleItem = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  // Navigation handlers for each section
  const handleEditAccount = () => {
    navigate("/register");
  };

  const handleEditBusiness = () => {
    navigate("/business-location");
  };

  const handleEditDocuments = () => {
    navigate("/documents");
  };

  const handleEditBank = () => {
    navigate("/bank-setup");
  };

  // Get document display names
  const getDocumentDisplayName = (key) => {
    const names = {
      gstCertificate: "GST Certificate",
      drugLicense: "Drug License",
      panCard: "PAN Card",
      cancelledCheque: "Cancelled Cheque",
      businessRegistration: "Business Registration",
      addressProof: "Address Proof",
    };
    return names[key] || key;
  };

  // Prepare document data
  const documents = reviewData?.documents || {};
  const documentsWithNames = Object.keys(documents).reduce((acc, key) => {
    acc[key] = {
      ...documents[key],
      displayName: documents[key].displayName || getDocumentDisplayName(key),
    };
    return acc;
  }, {});

  const sections = [
    {
      id: "account",
      icon: UserCircle2,
      title: "Account Information",
      subtitle: "Primary contact and security settings",
      content: <AccountInformationContent data={reviewData?.accountInfo} />,
      onEdit: handleEditAccount,
      editRoute: "/register",
    },
    {
      id: "business",
      icon: Building2,
      title: "Business Details",
      subtitle: "Company legal information and address",
      content: <BusinessDetailsContent data={reviewData?.businessDetails} />,
      onEdit: handleEditBusiness,
      editRoute: "/business-location",
    },
    {
      id: "documents",
      icon: FileText,
      title: "Uploaded Documents",
      subtitle: "Compliance and verification files",
      content: <UploadedDocumentsContent documents={documentsWithNames} />,
      onEdit: handleEditDocuments,
      editRoute: "/documents",
    },
    {
      id: "bank",
      icon: Landmark,
      title: "Bank Setup",
      subtitle: "Payout and billing configuration",
      content: <BankSetupContent data={reviewData?.bankSetup} />,
      onEdit: handleEditBank,
      editRoute: "/bank-setup",
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-5">
      {sections.map((section) => (
        <ReviewAccordionItem
          key={section.id}
          icon={section.icon}
          title={section.title}
          subtitle={section.subtitle}
          isOpen={openItem === section.id}
          onToggle={() => toggleItem(section.id)}
          onEdit={section.onEdit}
          editLabel="Edit"
        >
          {section.content}
        </ReviewAccordionItem>
      ))}
    </div>
  );
}
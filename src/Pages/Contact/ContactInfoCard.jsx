const ContactInfoCard = ({ title, description, value }) => {
  return (
    <div className="bg-base-200 rounded-xl p-6 shadow-sm">
      <h4 className="text-lg font-semibold text-secondary mb-2">
        {title}
      </h4>
      <p className="text-sm text-base-content/70 mb-2">
        {description}
      </p>
      <p className="font-medium text-base-content">
        {value}
      </p>
    </div>
  );
};

export default ContactInfoCard;

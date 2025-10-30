const Contact: React.FC = () => {
  const socialLinks = [
    { name: "Twitter", url: "https://x.com/swarnaa_k" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/swarna-kadagadkai/" },
    { name: "Medium", url: "https://medium.com/@swarnak" },
    { name: "Behance", url: "https://www.behance.net/swarnakadagad" },
  ];

  return (
    <section className="h-[500px] py-16 w-full">
      <div className="w-full px-16">
        {/* Contact Section */}
        <div className="bg-[#f9f9f9] rounded-3xl p-16 mb-16 h-[300px] flex items-center justify-center">
          <div className="text-center space-y-8">
            <h3 className="text-3xl font-medium text-gray-900">
              Question about my work?
            </h3>
            <h3 className="text-3xl font-medium">
              <a
                href="mailto:contact@swarna.design"
                className="text-[#1e8fd6] hover:text-[#1e8fd6] transition-colors"
              >
                Let's chat.
              </a>
            </h3>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="text-lg text-gray-600">
              Swarna Kadagadkai — September 2025
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-gray-900 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

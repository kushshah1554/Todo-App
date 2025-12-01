

const FeatureSection = ({ List, Clock, Users }) => {
  const features = [
    {
      title: "Easy Task Management",
      description:
        "Create, organize, and track your tasks with our intuitive interface",
      icon: List,
    },
    {
      title: "Real-time Updates",
      description: "Stay synced across all your devices with instant updates",
      icon: Clock,
    },
    {
      title: "Team Collaboration",
      description: "Share tasks and collaborate with your team seamlessly",
      icon: Users,
    },
  ];

  return (
    <section id="features" className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you stay organized and productive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

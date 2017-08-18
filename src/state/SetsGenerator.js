const SetsGenerator = {

    generate: (templateDay, weightSources) => {
        let sets = [];
        for (let lift of templateDay.lifts) {
            for (let set of lift.sets) {
                let source = lift.source;
                let weight = 5 * Math.round(
                    weightSources[source] * set.multiplier / 5.0);

                sets.push({
                    name: lift.name,
                    weight: weight,
                    reps: set.reps,
                    amrap: set.amrap,
                    completed: false
                });
            }
        }

        return sets;
    }
};

export default SetsGenerator;
